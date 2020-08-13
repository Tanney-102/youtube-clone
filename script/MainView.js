const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

document.getElementsByTagName('main')[0].style.minHeight = viewportHeight + 'px';