from flask import Flask, render_template
import markdown2
import os
from common.database import db, Post, init_db

app = Flask(__name__)
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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv('PORT', 5000)), debug=os.getenv('FLASK_DEBUG', 'True').lower() == 'true')
