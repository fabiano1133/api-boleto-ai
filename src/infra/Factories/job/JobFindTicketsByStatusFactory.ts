import { JobFindTicketsByStatus } from "@/domain/services/JobService";
import { MongoTicketRepositoryAdapter } from "@/infra/adapters/MongoTicketRepositoryAdapter";
import { MongoDatabaseAdapter } from "@/infra/database/mongo/MongoDatabaseAdapter";

export class JobFindTicketsByStatusFactory {
  static async make(): Promise<JobFindTicketsByStatus> {
    const mongoAdapter = new MongoDatabaseAdapter();
    const mongoRepository = new MongoTicketRepositoryAdapter(mongoAdapter);
    const job = new JobFindTicketsByStatus(mongoRepository);
    await job.cron();
    return job;
  }
}
