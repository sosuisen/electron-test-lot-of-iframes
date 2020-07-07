const { ipcRenderer } = require("electron");

let iframeReloadTimer = null;

const onready = () => {
  console.log('ready');

  const iframe = document.getElementById('frame');

  iframe.addEventListener('load', e => {
    console.log('iframe: loaded');
    // webview.openDevTools();
    document.body.insertAdjacentHTML('beforeend', 'iframe: loaded<br>');
    document.body.insertAdjacentHTML('beforeend', '[A] Sent ping to iframe<br>');
    iframe.contentWindow.postMessage({ action: 'ping' }, '*');
    console.log('Sent ping to iframe');
    iframeReloadTimer = setTimeout(() => { 
      console.log('Reload iframe');
      
      ipcRenderer.send('reloaded');

      document.body.insertAdjacentHTML('beforeend', 'Reload iframe<br>');
      window.location.reload();
    }, 1000);
  });
};

const onload = () => {
  console.log('loaded');
  
  window.addEventListener('message', e => {
    if (e.data.action == 'pong') {
      console.log('Received pong from iframe');
      document.body.insertAdjacentHTML('beforeend', '[B] Received pong from iframe<br>');
      clearTimeout(iframeReloadTimer);

      const q = window.location.search;
      const arr = q.slice(1).split('&');
      const params = {};
      for (var i = 0; i < arr.length; i++) {
        const pair = arr[i].split('=');
        params[pair[0]] = pair[1];
      }
      ipcRenderer.send('ready-' + params.id);
    }
  });
};

window.addEventListener('DOMContentLoaded', onready);
window.addEventListener('load', onload);