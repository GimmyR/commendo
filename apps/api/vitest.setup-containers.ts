import { PostgreSqlContainer, StartedPostgreSqlContainer } from "@testcontainers/postgresql";

let postgresContainer: StartedPostgreSqlContainer;

export async function setup() {
    console.log("==== 🚀 Initializing Testcontainers with PostgreSQL... ====");

    postgresContainer = await new PostgreSqlContainer("postgres:trixie")
        .withDatabase("api_test")
        .withUsername("test_user")
        .withPassword("test_password")
        .start();

    process.env.DATABASE_URL = postgresContainer.getConnectionUri();
    process.env.SALT = "12";
    process.env.JWT_SECRET = "loremipsumdolorsitametconsecteturadipiscingelitseddoeiusmodtempx";

    console.log(`==== ✅ Testcontainers with PostgreSQL is ready on port ${postgresContainer.getMappedPort(5432)}`);
}

export async function teardown() {
    console.log("==== 🛑 Stopping Testcontainers with PostgreSQL... ====");

    if(postgresContainer) {
        await postgresContainer.stop();
        console.log("==== ✅ Testcontainers with PostgreSQL has been successfully removed ====");
    }
}
