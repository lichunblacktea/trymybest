
  //replace url for navigator bar
  const baseUrl = `${window.location.origin}` + "/trymybest";
  //const baseUrl = `${window.location.origin}`
  console.log (baseUrl);
  document.getElementById('homeLink').href = `${baseUrl}/index`;

  document.getElementById('posts').href = `${baseUrl}/posts`;
  document.getElementById('postsPreview').href = `${baseUrl}/postsPreview`;
  document.getElementById('postsEdit').href = `${baseUrl}/postsEdit`;
  document.getElementById('postsAdd').href = `${baseUrl}/postsAdd`;

  document.getElementById('basicTemplate').href = `${baseUrl}/basictemplate`;

  document.getElementById('int').href = `${baseUrl}/int`;
  document.getElementById('intCafe').href = `${baseUrl}/intCafe`;
  document.getElementById('intCooking').href = `${baseUrl}/intCooking`;
  document.getElementById('intDrawing').href = `${baseUrl}/intDrawing`;

  document.getElementById('poker').href = `${baseUrl}/pokerRangeMain`;
  document.getElementById('').href = `${baseUrl}/`;
  document.getElementById('').href = `${baseUrl}/`;
  document.getElementById('').href = `${baseUrl}/`;