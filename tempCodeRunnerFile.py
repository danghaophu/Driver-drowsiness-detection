import torch

weights_path = r'E:\do an tot nghiep\SafeDriveVision-master\SafeDriveVision-master\yolov5.pt'
model = torch.hub.load('ultralytics/yolov5', 'custom', path=weights_path, force_reload=True)
device = torch.device('cpu')
model.to(device)