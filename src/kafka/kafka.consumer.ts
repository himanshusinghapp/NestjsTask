import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class KafkaConsumerController {
  logger: any;
  @EventPattern('user_registered')
  handleUserRegistered(@Payload() message: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const user = message.value;
    console.log('User registered:', user);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    this.logger.log(`New user registered: ${user.name} (${user.email})`);
  }

  @EventPattern('post_created')
  handlePostCreated(@Payload() message: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const post = message.value;
    console.log('Post created:', post);
  }
}
