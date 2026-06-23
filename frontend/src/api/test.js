import api from "../utils/api";

export const msg = async () => {
    try {
        
        const res = await api.get("/");
        return res.data;

    } catch (error) {
        throw error;
    }
}