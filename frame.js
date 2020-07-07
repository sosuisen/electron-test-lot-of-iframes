window.addEventListener('message', e => {
  if (e.data.action == 'ping') {
    document.body.insertAdjacentHTML('beforeend', '[A] Received ping from parent<br>');
    console.log('[iframe] Received ping from parent');    
  
    document.body.insertAdjacentHTML('beforeend', '[B] Sent pong to parent<br>');
    window.parent.postMessage({ action: 'pong' }, '*');
    console.log('[iframe] Sent pong to parent');  
  }
});

const onload = () => {
  console.log('[iframe] loaded');
  document.body.insertAdjacentHTML('beforeend', 'loaded<br>');
}

window.addEventListener('load', onload);
