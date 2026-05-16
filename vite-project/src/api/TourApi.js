const BASE_URL = "http://localhost:8080/tours";
async function createTour(data) {
    try {
        const response = await fetch(`${BASE_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        console.error("Lỗi khi tạo tour:", error);
    }
}

async function deleteTour(id) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        return await response.json();
    } catch (error) {
        console.error("Lỗi khi xóa tour:", error);
    }
}

async function updateTour(id, data) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        console.error("Lỗi khi cập nhật tour:", error);
    }
}

async function fetchTours() {
    try {
        const response = await fetch(`${BASE_URL}`);
        return await response.json();
    } catch (error) {
        console.error("Lỗi khi lấy danh sách tour:", error);
    }
}
export {createTour,deleteTour,updateTour,fetchTours};