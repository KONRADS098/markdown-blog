from flask import Flask, render_template, request, redirect, url_for
from flask_basicauth import BasicAuth
import markdown2
import os
from common.database import db, Post, init_db

app = Flask(__name__)

# Basic Auth configuration
app.config['BASIC_AUTH_USERNAME'] = os.getenv('ADMIN_USERNAME', 'admin')
app.config['BASIC_AUTH_PASSWORD'] = os.getenv('ADMIN_PASSWORD', 'change-me-in-production')
app.config['BASIC_AUTH_FORCE'] = True

basic_auth = BasicAuth(app)
init_db(app)

@app.route('/')
def index():
    posts = Post.query.order_by(Post.created_at.desc()).all()
    return render_template('index.html', posts=posts)

@app.route('/post/<int:post_id>')
def post(post_id):
    post = Post.query.get_or_404(post_id)
    content = markdown2.markdown(post.content)
    return render_template('post.html', post=post, content=content)

@app.route('/create', methods=['GET', 'POST'])
def create():
    if request.method == 'POST':
        title = request.form['title']
        content = request.form['content']
        post = Post(title=title, content=content)
        db.session.add(post)
        db.session.commit()
        return redirect(url_for('index'))
    return render_template('create.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv('PORT', 5000)), debug=os.getenv('FLASK_DEBUG', 'True').lower() == 'true')
