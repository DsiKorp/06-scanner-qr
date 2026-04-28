
export class Registry {
    public format: string;
    public text: string;
    public type: string;
    public icon: string;
    public created: Date;

    constructor(format: string, text: string) {
        this.format = format;
        this.text = text;
        this.type = this.determineType(text);
        this.icon = this.determineIcon(this.type);
        this.created = new Date();
    }

    private determineType(text: string): string {
        if (text.startsWith('http://') || text.startsWith('https://')) {
            return 'url';
        } else if (text.startsWith('geo:')) {
            return 'geo';
        } else if (text.startsWith('BEGIN:VCARD')) {
            return 'contact';
        } else {
            return 'text';
        }
    }

    private determineIcon(type: string): string {
        switch (type) {
            case 'url':
                return 'globe';
            case 'geo':
                return 'map';
            case 'contact':
                return 'person';
            default:
                return 'document';
        }
    }



}