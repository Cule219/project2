function openNav() {
  document.getElementById("myNav").style.width = "100%";
  document.getElementsByClassName('overlay-content')[0].style.display = 'block'
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
  document.getElementsByClassName('overlay-content')[0].style.display = 'none';
}

let url = 'http://localhost:3000/article/comment';


document.getElementById('new-comment').addEventListener('keypress', (e)=>{
  let key = e.which || e.keyCode;
  if (key === 13) {
    let inputComment = document.getElementById('new-comment').value;
    axios.post(url, {comment: inputComment}).then(data=>{
      newComment(data);
    });
  }
});
//have an  input added as the last element of article-comments
const newComment = (data) => {
  let container             = document.getElementsByClassName('comment-container')[0];
  
  let articleComment        = document.createElement("div");
  articleComment.classList  = 'article-comment';
  let imgUser               = document.createElement('img');

  imgUser.setAttribute('height','100px');
  imgUser.setAttribute('src', data.data.user[0].profileImg)
  articleComment.appendChild(imgUser);
  
  let commentContent        = document.createElement("div");
  commentContent.classList  = 'article-comment-content';
  

  let h3Name                = document.createElement('h3');
  h3Name.innerHTML          = data.data.user[0].username; //This too
  let descriptionUser       = document.createElement('p');
  descriptionUser.innerHTML = data.data.data.content;
  let ratingUser            = document.createElement('p');
  ratingUser.innerHTML      = `<em>Rating: </em>${data.data.data.rating || 0}`//This 3
  let likeButton            = document.createElement('button');
  likeButton.innerHTML      = 'Like';
  likeButton.classList      = 'like-button';

  commentContent.appendChild(h3Name);
  commentContent.appendChild(descriptionUser);
  commentContent.appendChild(ratingUser);
  commentContent.appendChild(likeButton);
  articleComment.appendChild(commentContent);
  container.appendChild(articleComment);  
}


document.getElementById('like-button').addEventListener('click', () => {
  console.log('working')
  axios.post('http://localhost:3000/article/').then(data => {
    console.log(req.session)
  })
})