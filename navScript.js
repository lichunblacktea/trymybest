
  google.script.run.withSuccessHandler(setHref).getBaseURL();  // Ensure this matches your server-side function name
  function setHref(baseUrl){
    document.getElementById('homeLink').href = `${baseUrl}?page=index`;

    document.getElementById('posts').href = `${baseUrl}?page=posts`;
    document.getElementById('postsPreview').href = `${baseUrl}?page=postsPreview`;
    document.getElementById('postsEdit').href = `${baseUrl}?page=postsEdit`;
    document.getElementById('postsAdd').href = `${baseUrl}?page=postsAdd`;

    document.getElementById('basicTemplate').href = `${baseUrl}?page=basictemplate`;

    document.getElementById('int').href = `${baseUrl}?page=int`;
    document.getElementById('intCafe').href = `${baseUrl}?page=intCafe`;
    document.getElementById('intCooking').href = `${baseUrl}?page=intCooking`;
    document.getElementById('intDrawing').href = `${baseUrl}?page=intDrawing`;
  }
