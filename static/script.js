const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const statusTable = document.getElementById('statusTable').getElementsByTagName('tbody')[0];

navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  });

setInterval(() => {
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  canvas.toBlob((blob) => {
    const formData = new FormData();
    formData.append('frame', blob);

    fetch('/detect', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      const now = new Date();
      const time = now.toLocaleTimeString();

      const row = statusTable.insertRow(0); // insert đầu bảng
      const cellTime = row.insertCell(0);
      const cellStatus = row.insertCell(1);

      cellTime.innerText = time;
      cellStatus.innerText = data.status;

      // Giới hạn tối đa 10 dòng
      if (statusTable.rows.length > 10) {
        statusTable.deleteRow(-1); // xóa dòng cuối
      }
    });
  }, 'image/jpeg');
}, 1000);
