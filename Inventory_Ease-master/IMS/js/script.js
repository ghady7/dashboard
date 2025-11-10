document.addEventListener('DOMContentLoaded', function() {
  const submenuToggles = document.querySelectorAll('.has-submenu .submenu-toggle');
  submenuToggles.forEach(function(toggle) {
      toggle.addEventListener('click', function(e) {
          e.preventDefault();
          const submenu = this.parentElement.querySelector('.submenu');
          submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
      });
  });

  const toggleBtn = document.getElementById('toggleBtn');
  const dashboard_sidebar = document.getElementById('dashboard_sidebar');
  const dashboard_content_container = document.getElementById('dashboard_content_container');
  const dashboard_logo = document.getElementById('dashboard_logo');
  const userImage = document.getElementById('userImage');
  const userName = document.getElementById('userName');

  var sidebarWidth = '250px';

  toggleBtn.addEventListener('click', (event) => {
      event.preventDefault();

      if (sidebarWidth === '15%') {
          openSidebar();
      } else {
          closeSidebar();
      }
  });

  let arrOfSubmenus=document.querySelectorAll('.submenu');
  let arrOfSubmenusLinks=document.querySelectorAll('.submenuLinks');
  function closeSidebar() {
      sidebarWidth = '15%';
      dashboard_sidebar.style.width = sidebarWidth;
      dashboard_sidebar.style.transition = '0.3s all';
      dashboard_content_container.style.width = '87%';
      dashboard_logo.style.fontSize = '20px';
      dashboard_logo.style.textalign = 'center';
      dashboard_logo.style.paddingright = '0';
      dashboard_logo.style.paddingLeft = '6px';
      userImage.style.width = '50px';
      userName.style.fontSize = '14px';
      userName.style.textAlign="center"; 

      document.querySelector(".dashboard_sidebar").style.padding='10px';

      for(let i=0;i<arrOfSubmenus.length;i++){
        arrOfSubmenus[i].style.paddingLeft='0';
      }
      for(let i=0;i<arrOfSubmenusLinks.length;i++){
        arrOfSubmenusLinks[i].style.paddingLeft='0';
        arrOfSubmenusLinks[i].style.fontSize='13px';
        arrOfSubmenusLinks[i].style.textWrap='nowrap';
        
      }


      var menuIcons = document.getElementsByClassName('menuText');
      for (var i = 0; i < menuIcons.length; i++) {
          menuIcons[i].style.display = 'none';
      }

      document.getElementsByClassName('dashboard_menu_lists')[0].style.textAlign = 'center';
  }

  function openSidebar() {
      sidebarWidth = '20%'; 
      dashboard_sidebar.style.width = sidebarWidth;
      dashboard_content_container.style.width = 'calc(100% - ' + sidebarWidth + ')';
      dashboard_logo.style.fontSize = '24px'; 
      userImage.style.width = '50px'; 
      userName.style.fontSize = '18px';
      
        
        document.querySelector(".dashboard_sidebar").style.padding='20px';

      for(let i=0;i<arrOfSubmenus.length;i++){
        arrOfSubmenus[i].style.paddingLeft='20px';
      }
      for(let i=0;i<arrOfSubmenusLinks.length;i++){
        arrOfSubmenusLinks[i].style.paddingLeft='0';
        arrOfSubmenusLinks[i].style.fontSize='16px';
      }
            var menuIcons = document.getElementsByClassName('menuText');

      for (var i = 0; i < menuIcons.length; i++) {
          menuIcons[i].style.display = 'flex';
      }

      document.getElementsByClassName('dashboard_menu_lists')[0].style.textAlign = 'left';
  }
});