export default {
	usernameonTextChanged() {
		const userNameLog = username.text;
		const passWord = password.text;

		// Gọi query để lấy dữ liệu
		return selectRegister.run().then((response) => {
			const excelData = response; // Dữ liệu từ query

			// Kiểm tra xem dữ liệu có tồn tại không
			if (!excelData || excelData.length === 0) {
				return;
			}

			// Tạo danh sách người dùng từ dữ liệu
			const userCredentials = excelData.map(row => ({ userName: row.userName, passWord: row.passWord, typeUser: row.typeUser }));

			// Kiểm tra xem username và mật khẩu có trùng khớp không
			const user = userCredentials.find(cred => cred.userName === userNameLog && cred.passWord === passWord);

			if (user) {
				if (user.typeUser === "teacher") {
                    navigateTo("homeTeacher"); // Trang dành cho giáo viên
                } else {
                    navigateTo("homeStudent"); // Trang dành cho sinh viên
                }
			} else {
				console.error("Username or password is incorrect.");
			}
		}).catch((error) => {
			console.error("Error fetching data:", error);
		});
	}
}
