enum DrawStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED'
}

interface Participant {
  id: number;
  name: string;
  email: string;
  wishlist?: string;
}

interface DrawResult {
  giver: string;
  receiver: string;
}

class SecretSantaService {
  private participants: Participant[] = [];
  private status: DrawStatus = DrawStatus.PENDING;
  private results: DrawResult[] = [];

  addParticipant(participant: Participant): void {
    this.participants.push(participant);
  }

  listParticipants(): void {
    if (this.participants.length === 0) {
      console.log('No participants registered yet.');
      return;
    }

    this.participants.forEach((participant: Participant) => {
      console.log(`${participant.name} - ${participant.email}`);
    });
  }

  isValidForDraw(): boolean {
    return this.participants.length >= 3;
  }

  performDraw(): void {
    if (!this.isValidForDraw()) {
      console.error('Draw is invalid: at least 3 participants are required.');
      return;
    }

    const shuffledParticipants: Participant[] = [...this.participants];
    this.shuffleParticipants(shuffledParticipants);

    this.results = shuffledParticipants.map(
      (giver: Participant, index: number): DrawResult => {
        const nextIndex: number = (index + 1) % shuffledParticipants.length;
        const receiver: Participant = shuffledParticipants[nextIndex];

        return {
          giver: giver.name,
          receiver: receiver.name
        };
      }
    );

    this.status = DrawStatus.COMPLETED;
  }

  printResults(): void {
    if (this.status !== DrawStatus.COMPLETED || this.results.length === 0) {
      console.log('No draw results available.');
      return;
    }

    this.results.forEach((result: DrawResult) => {
      console.log(`${result.giver} drew ${result.receiver}`);
    });
  }

  private shuffleParticipants(participants: Participant[]): void {
    for (let index: number = participants.length - 1; index > 0; index -= 1) {
      const randomIndex: number = Math.floor(Math.random() * (index + 1));
      const currentParticipant: Participant = participants[index];

      participants[index] = participants[randomIndex];
      participants[randomIndex] = currentParticipant;
    }
  }
}

const secretSantaService: SecretSantaService = new SecretSantaService();

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
