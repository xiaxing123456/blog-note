# 将 base64 图片以 form-data 格式上传到图片服务器

## 1.思路

1. 将 `base64`格式图片处理为 Blob 对象
2. 将 `Blob` 对象添加到 `form-data`对象中。
3. `http`请求设置为`context-type: multipart/form-data`上送到文件服务器。

## 2.将 base64 图片处理为 Blob 对象
