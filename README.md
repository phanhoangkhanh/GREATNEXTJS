## React + TypeScript + Vite (Hỏi Dân IT)

Template này được sử dụng cho series React/Next.JS của tác giả Hỏi Dân IT (Eric)

Các bước cần làm:

1. Clone dự án
2. Cài đặt các thư viện cần thiết: npm i
3. Chạy dự án với câu lệnh: npm run dev

&nbsp;
Truy cập: http://localhost:5173/

esline chỉ để phát hiện lỗi
index.html chỉ có với react client - là diem bắt đầu của code

Component phải viết hoa chữ đầy MyComponent
viết => return( <>.............. </> )

export default Component
thì bên import có thể viết tên gì cũng hiểu dc
vd: import comPonent from '...../...
Va moi file chỉ dc export default 1 lần duy nhất.

export { hiA ,hiB }

JSX là hero phía sau hau truong -- giúp chúng ta code HTML + JavaScript chung 1 chổ trong component .

Ép JSX xuất 1 bien obj thì dùng JSON.stringify(obj) =>> string

style = {{}} . viet Java trong JSX và truyeen 1 obj vô

ký tự dac biet: HTML Entities.

Component đều có 1 biến props mặc đinh sẵn sẽ nhận tất cả prop truyền về
return ( <Child age name='khanh'>)
Qua bên Child goi props có đủ name và age

TypeScipt = JavaScript + (type) checkType/ gơi ý coode.
TypeS kết hop check phần cha + con đảm bảo sư đúng đặn khi code .

Cài dat React Developer Tool cho browser --> mục component + profile xác đinh hieu năng React .

BẠN CÓ THỂ XỬ LÝ SO LIEU NỘI BỘ - NHƯNG KO THỂ RERENDER DC COMPONENT NẾU KO DÙNG USESTATE
HÃY TẬN DUNG VIEC NÀY ĐIỀU KHIỂN CÁC SIGNAL - MÀ KO CẦN PHẢI RERENDER LẠI.
STATE LÀ BỘ NHỚ CỦA 1 COMPONENT - 1 biến thường ko thể coi là state dc

Cha truyền state+ hàm về con xử lý rồi hiển thị list bên cha - lớp con chỉ chứa những HTML Obj để xử lý thuần túy . Còn hàm + data state vẫn bên cha

State và Props thay đổi thì rerender lại ( chỉ chổ thay đổi ) - Va mún rerender thì chỉ có thể thay đổi state hoac props ( state của lớp cha truyền về )

Có 2 cây DOM : real DOM và virtual DOM. React so sánh 2 cây này. chỗ nào thay doi mới rerender chính xác node DOM chỗ đó. chứ ko phải toàn bộ component

Batch update: chỉ rerender lai giao dien 1 lần sau khi mutate tat cả state 1 luot
