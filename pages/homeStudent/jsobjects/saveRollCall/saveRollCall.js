export default {
	btnRollCallonClick() {
		const idStudent = sUserName.text; // Lấy mã sinh viên
		const sName = shoTen.text; // Lấy tên sinh viên
		const rollCall = sRollCall.text; // Lấy mã điểm danh

		// Kiểm tra tính hợp lệ của dữ liệu trước khi gọi API
		if (!idStudent || !sName || !rollCall) {
			showAlert("Vui lòng điền đầy đủ thông tin.", "error");
			return;
		}

		// Gọi API để thêm dữ liệu
		return Api1.run({
			idRollCall: rollCall,
			idStudent: idStudent,
			sName: sName
		}).then(response => {
			// Xử lý phản hồi từ API
			console.log(response);
			if (response.message) {
				showAlert("Điểm danh thành công: ", "success");
			} else {
				showAlert("Điểm danh thành công!", "error");
			}
		}).catch(error => {
			console.error("Error adding roll call data:", error);
			showAlert("Có lỗi xảy ra khi thêm dữ liệu.", "error");
		});
	}
}
