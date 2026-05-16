const BASE_URL = "http://localhost:8080/users";
async function createUser(data) {
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
        console.error("Lỗi khi tạo người dùng mới:", error);
    }
}

async function deleteUser(id) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        return await response.json();
    } catch (error) {
        console.error("Lỗi khi xóa người dùng:", error);
    }
}

async function updateUser(id, data) {
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
        console.error("Lỗi khi cập nhật người dùng:", error);
    }
}

async function fetchUsers() {
    try {
        const response = await fetch(`${BASE_URL}`);
        return await response.json();
    } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
    }
}
export {createUser,deleteUser,updateUser,fetchUsers};