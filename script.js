<nav> 
  <ul>
    <li class="dropdown">
      <a id="homeLink" href="#">Home</a>
      <ul class="dropdown-content">
        <li><a href="#">Sub-item 1</a></li>
        <li><a href="#">Sub-item 2</a></li>
        <li><a href="#">Sub-item 3</a></li>
      </ul>
    </li>
    <li class="dropdown">
      <a id="posts" href="#">Blog Posts</a>
      <ul class="dropdown-content">
        <li><a id="postsPreview" href="#">Preview</a></li>
        <li><a id="postsEdit" href="#">Edit</a></li>
        <li><a id="postsAdd" href="#">Add</a></li>
      </ul>
    </li>
    <li class="dropdown">
      <a id="basicTemplate" href="#">Basic Template</a>
      <ul class="dropdown-content">
        <li><a href="#">Sub-item 1</a></li>
        <li><a href="#">Sub-item 2</a></li>
        <li><a href="#">Sub-item 3</a></li>
      </ul>
    </li>
    <li class="dropdown">
      <a id="int" href="#">Interest</a>
      <ul class="dropdown-content">
        <li><a id="intCafe" href="#">Cafe</a></li>
        <li><a id="intCooking" href="#">Cooking</a></li>
        <li><a id="intDrawing" href="#">Drawing</a></li>
      </ul>
    </li>    
  </ul>
</nav>

<hr>

<script>
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
</script>
