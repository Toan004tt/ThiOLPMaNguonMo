export default {
	usernameonTextChanged() {
		const inputValue = username.text;
		const name = Input1.text;
		const pass = password.text;
		const typeUser = Select1.selectedOptionValue;

		// Gọi query để lấy dữ liệu
		return Api1.run().then((response) => {
			const excelData = response; // Dữ liệu từ query

			// Kiểm tra xem dữ liệu có tồn tại không
			if (!excelData || excelData.length === 0) {
				tbusername.setText("Data rỗng"); // Gán thông báo cho tbusername
				return; // Thoát hàm nếu không có dữ liệu
			}

			// Tạo danh sách mã sinh viên từ dữ liệu
			const existingUsernames = excelData.map(row => row.idStudent);

			// Kiểm tra xem mã sinh viên đã tồn tại chưa
			if (existingUsernames.includes(inputValue) && typeUser == "student") {
				tbusername.setText("");

				// Gọi query để lưu thông tin vào file Excel
				ApiInsertData.run({
					"userName": name,
					"passWord": inputValue,
					"name": pass,
					"typeUser": typeUser
				}).then(() => {
					navigateTo("LoginPag");
				}).catch((error) => {
					console.error("Error saving data:", error);
					tbusername.setText("Không thể lưu dữ liệu.");
				});
			} else {
				tbusername.setText("Mã sinh viên không tồn tại!");

				// Gọi API khác để tải dữ liệu
				return 	selectTeacher.run().then((newDataResponse) => {
					// Xử lý dữ liệu mới nhận được
					if (newDataResponse && newDataResponse.length > 0) {
						// Kiểm tra xem mã sinh viên có trong dữ liệu mới không
						const newUsernames = newDataResponse.map(row => row.idTeacher);
						if (newUsernames.includes(inputValue) && typeUser =="teacher") {
							tbusername.setText("");
							// Lưu thông tin vào file Excel
							ApiInsertData.run({
								"userName": name,
								"passWord": inputValue,
								"name": pass,
								"typeUser": typeUser
							}).then(() => {
								navigateTo("LoginPag");
							}).catch((error) => {
								console.error("Error saving data:", error);
								tbusername.setText("Không thể lưu dữ liệu.");
							});
						} else {
							tbusername.setText("Mã không tồn tại!");
						}
					} else {
						tbusername.setText("Không có dữ liệu mới!");
					}
				}).catch((error) => {
					console.error("Error fetching new data:", error);
					tbusername.setText("Không thể tải dữ liệu mới.");
				});
			}
		}).catch((error) => {
			console.error("Error fetching data:", error);
			tbusername.setText("Không thể lấy dữ liệu.");
		});
	}
}
