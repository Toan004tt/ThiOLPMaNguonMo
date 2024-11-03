export default {
	Button1onClick() {
		const idClass = malophoc.selectedOptionValue; // Lấy mã lớp học
		const idRollCall = RollCall.text; // Lấy mã điểm danh
		const indexRow = appsmith.store.indexRow; // Lấy index từ store

		// Kiểm tra xem indexRow có hợp lệ không
		if (indexRow === undefined || indexRow === null) {
			console.error("Index row không hợp lệ.");
			showAlert("Có lỗi xảy ra. Vui lòng chọn một lớp học.", "error");
			return;
		}

		// Gọi API để cập nhật dữ liệu
		if(idClass != "" && idRollCall != ""){
			return createRollcall.run({
				idClass: idClass,
				idRollCall: idRollCall,
				indexRow: indexRow // Nếu API cần thông tin này
			}).then(response => {
				// Xử lý phản hồi từ API
				if (response.message) {
					showAlert("Tạo mã thành công!","success");
				} else {
					showAlert("Tạo mã không thành công!", "error");
				}
			}).catch(error => {
				console.error("Error updating roll call data:", error);
				showAlert("Có lỗi xảy ra khi cập nhật dữ liệu.", "error");
			});
		}else{
			showAlert("Vui lòng điền đẩy đủ thông tin!", "error");
		}
	}
}
