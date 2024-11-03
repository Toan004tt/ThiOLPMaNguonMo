export default {
    malophoconOptionChange() {
        const idClass = malophoc.selectedOptionValue; 
        return saveIndexRow.run().then(response => {
            const classData = response; // Dữ liệu từ query

            // Kiểm tra xem mã lớp học có trong dữ liệu không
            const classEntry = classData.find((row, index) => {
                if (row.idClass === idClass) {
                    // Nếu tìm thấy mã lớp học, lưu index row vào appsmith.store
									storeValue("indexRow", index);
                    return true;
                }
                return false;
            });

            if (classEntry) {
                // Nếu mã lớp học tồn tại trong dữ liệu
                console.log("Mã lớp học hợp lệ, lưu index vào store:", appsmith.store.indexRow);
            } else {
                console.log("Mã lớp học không tồn tại trong dữ liệu.");
            }
        }).catch(error => {
            console.error("Error fetching class data:", error);
        });
    }
}
