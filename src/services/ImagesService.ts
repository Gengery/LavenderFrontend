import store, { GET_API_IMAGES_URL } from "@/store";

export class ImageService {
    private static instance: ImageService;
    private domain: string;

    private constructor() {
        this.domain = store.getters[GET_API_IMAGES_URL];
    }

    public static getInstance() {
        if (!ImageService.instance)
            ImageService.instance = new ImageService();
        return ImageService.instance;
    }

    public async sendImage(image: File):Promise<boolean> {
        const formData = new FormData();
        formData.append('file', image);

        try {
            const response = await fetch(`${this.domain}/upload`, {
                method: 'POST',
                body: formData
            });
            return response.ok;
        }
        catch {
            console.log('Ошибка при загрузке изображения');
            return false;
        }
    }

    public async getImage(name: string):Promise<string> {

        try {
            const response = await fetch(`${this.domain}/images/${name}`);
            const blob = await response.blob();
            return URL.createObjectURL(blob);
        }
        catch {
            console.log('Изображение не получено');
            return '';
        }
        
    }
}