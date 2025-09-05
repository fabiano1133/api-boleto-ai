import { AbstractAppFactory } from "@/app/factories/AbstractAppFactory";
import { AppFactory } from "@/infra/Factories/AppFactory";
import { CreateMongoDatabaseFactory } from "./infra/Factories/mongo/CreateMongoDatabaseFactory";
import { JobFindTicketsByStatusFactory } from "./infra/Factories/job/JobFindTicketsByStatusFactory";

import { appConfig } from "./infra/config/app.config";

const start = async () => {
  await CreateMongoDatabaseFactory.make();

  const factory: AbstractAppFactory = new AppFactory();

  const app = factory.create();

  await JobFindTicketsByStatusFactory.make();

  app.listen(appConfig.HTTP_PORT, () =>
    console.log(`Server is Running on PORT: ${appConfig.HTTP_PORT}💻 🚀`)
  );
};

start();
