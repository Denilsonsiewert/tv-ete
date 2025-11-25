(function(){
  const select = document.getElementById('refreshInterval');
  let timer = null;
  function applyInterval(val){
    const seconds = parseInt(val, 10) || 0;
    if (timer) clearInterval(timer);
    if (seconds > 0) timer = setInterval(() => location.reload(), seconds * 1000);
  }
  select.addEventListener('change', e => applyInterval(e.target.value));
  applyInterval(select.value);

  document.getElementById('fullscreenBtn').addEventListener('click', () => {
    const el = document.documentElement;
    if (!document.fullscreenElement) el.requestFullscreen();
    else document.exitFullscreen();
  });
})();
