var DrawStatus;
(function (DrawStatus) {
    DrawStatus["PENDING"] = "PENDING";
    DrawStatus["COMPLETED"] = "COMPLETED";
})(DrawStatus || (DrawStatus = {}));
class SecretSantaService {
    constructor() {
        this.participants = [];
        this.status = DrawStatus.PENDING;
        this.results = [];
    }
    addParticipant(participant) {
        this.participants.push(participant);
    }
    listParticipants() {
        if (this.participants.length === 0) {
            console.log('No participants registered yet.');
            return;
        }
        this.participants.forEach((participant) => {
            console.log(`${participant.name} - ${participant.email}`);
        });
    }
    isValidForDraw() {
        return this.participants.length >= 3;
    }
    performDraw() {
        if (!this.isValidForDraw()) {
            console.error('Draw is invalid: at least 3 participants are required.');
            return;
        }
        const shuffledParticipants = [...this.participants];
        this.shuffleParticipants(shuffledParticipants);
        this.results = shuffledParticipants.map((giver, index) => {
            const nextIndex = (index + 1) % shuffledParticipants.length;
            const receiver = shuffledParticipants[nextIndex];
            return {
                giver: giver.name,
                receiver: receiver.name
            };
        });
        this.status = DrawStatus.COMPLETED;
    }
    printResults() {
        if (this.status !== DrawStatus.COMPLETED || this.results.length === 0) {
            console.log('No draw results available.');
            return;
        }
        this.results.forEach((result) => {
            console.log(`${result.giver} drew ${result.receiver}`);
        });
    }
    shuffleParticipants(participants) {
        for (let index = participants.length - 1; index > 0; index -= 1) {
            const randomIndex = Math.floor(Math.random() * (index + 1));
            const currentParticipant = participants[index];
            participants[index] = participants[randomIndex];
            participants[randomIndex] = currentParticipant;
        }
    }
}
const secretSantaService = new SecretSantaService();
secretSantaService.addParticipant({
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    wishlist: 'Book'
});
secretSantaService.addParticipant({
    id: 2,
    name: 'Bruno Silva',
    email: 'bruno@example.com',
    wishlist: 'Headphones'
});
secretSantaService.addParticipant({
    id: 3,
    name: 'Carla Mendes',
    email: 'carla@example.com',
    wishlist: 'Coffee machine'
});
secretSantaService.addParticipant({
    id: 4,
    name: 'Diego Costa',
    email: 'diego@example.com',
    wishlist: 'Board game'
});
secretSantaService.listParticipants();
secretSantaService.performDraw();
secretSantaService.printResults();
