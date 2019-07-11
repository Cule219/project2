function openNav() {
  document.getElementById("myNav").style.width = "100%";
  document.getElementsByClassName('overlay-content')[0].style.display = 'block'
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
  document.getElementsByClassName('overlay-content')[0].style.display = 'none';
}

const getUrl = window.location;
const baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];

let com = document.getElementById('new-comment');

if(com != undefined){
com.addEventListener('keypress', (e)=>{
  let key = e.which || e.keyCode;
  if (key === 13) {
    let inputComment = document.getElementById('new-comment').value;
    axios.post(`${baseUrl}comment`, {comment: inputComment}).then(data=>{
      newComment(data);
    });
    inputComment.value = '';
  }
});}

//this renders each comment
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
  h3Name.innerHTML          = data.data.user[0].username;
  let descriptionUser       = document.createElement('p');
  descriptionUser.innerHTML = data.data.data.content;
  let ratingUser            = document.createElement('p');
  ratingUser.innerHTML      = `<em>Rating: </em>${data.data.data.rating || 0}`;
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

let likeButton = document.getElementById('like-button');
if(likeButton !== undefined){
  likeButton.addEventListener('click', (e) => {
    axios.patch(`${baseUrl}article/`).then(data => {
      console.log(data)
    })
  })
}