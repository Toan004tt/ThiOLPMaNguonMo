export default {
    sRollCallonTextChanged() {
        const idRollCall = sRollCall.text; // Lấy mã điểm danh từ input

        // Gọi query để kiểm tra mã điểm danh
        return checkRollCall.run().then(response => {
            const rollCallData = response;
            const rollCallEntry = rollCallData.find(row => row.idRollCall === idRollCall);

            if (rollCallEntry) {
                // Nếu mã điểm danh hợp lệ, hiện thông báo thành công
                showAlert("Mã điểm danh hợp lệ!", "success");
            } else {
                // Nếu không hợp lệ, thông báo mã điểm danh không hợp lệ
                showAlert("Mã điểm danh không hợp lệ!", "error");
            }
        }).catch(error => {
            console.error("Error fetching roll call data:", error);
            showAlert("Có lỗi xảy ra khi kiểm tra mã điểm danh.", "error");
        });
    }
}
