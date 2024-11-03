export default {
    Button1Copy2onClick () {
        const idRallColl = Input2.text;

        return Find_tblRollCall1.run().then(data => {
            // Lọc dữ liệu dựa trên idRollCall
            const filteredData = data.filter(item => item.idRollCall === idRallColl);
            
            // Nếu có dữ liệu phù hợp, cập nhật Table1
            if (filteredData.length > 0) {
                Table1.setData(filteredData);
            } else {
                // Xử lý khi không có dữ liệu phù hợp (tùy chọn)
                Table1.setData([]); // Hoặc thông báo người dùng
            }
        }).catch(error => {
            console.error("Error fetching data:", error);
            // Có thể thông báo lỗi cho người dùng ở đây
        });
    }
}
