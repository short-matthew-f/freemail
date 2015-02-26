var postShowSource   = $("#post-show-template").html();
var postShowTemplate = Handlebars.compile(postShowSource);

var postFormSource   = $("#post-form-template").html();
var postFormTemplate = Handlebars.compile(postFormSource);

function createPost (post) {
  $.ajax({
    url: '/posts',
    method: 'POST',
    dataType: 'json',
    data: post,
    success: addPostToDOM
  });
};

function addPostToDOM (post) {
  $('#posts').append( postShowTemplate(post) );
};

function deletePost (id) {
  $.ajax({
    url: '/posts/' + id,
    method: 'delete',
    dataType: 'json',
    success: removePostFromDOM
  });
};

function removePostFromDOM (post) {
  $('.post').filter(function (index, el) {
    return $(el).data('id') == post.id;
  }).slideUp(function () {
    $(this).remove(); // calls remove after slideUp is finished
  });
};

function retrievePosts () {
  $.ajax({
    url: '/posts',
    dataType: 'json',
    success: renderPosts
  });
};

function renderPosts (posts) {
  $('#posts').html();

  $(posts).each(function (index, post) {
    appendPost(post);
  });
};

$('#new').html(postFormTemplate());

$('form').submit(function (event) {
  event.preventDefault();
  var formData = this.elements;

  var post = {
    post: {
      title: formData.title.value,
      content: formData.content.value
    }
  };

  createPost(post);
});

$('#posts').on('click', '.delete', function (event) {
  var id = $(this).parent().data('id');
  deletePost( id );
});

retrievePosts();
