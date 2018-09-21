
export interface DesignDefinition {
    readonly width: number;
    readonly height: number;
}

class DesignService {


    async load(): Promise<DesignDefinition> {
        return Promise.resolve({
            get width() { return 100 },
            get height() { return 100 }
        });
    }

}

export default new DesignService();