// 获取上传图片的URL
// export default async (fileList) => {
//   const urlList: {
//     [key: string]: any;
//   } = {};
//   for (const file of fileList) {
//     const value = Object.values(file)[0] as any;
//     const key = Object.keys(file)[0];
//     if (value.originFileObj) {
//       const formData = new FormData();
//       formData.append('file', value.originFileObj);
      // urlList[key] = (await uploadImg(formData)).data[0];
//     } else urlList[key] = value.url;
//   }
//   return urlList;
// };