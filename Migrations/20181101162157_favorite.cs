using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace mijn_recepten.Migrations
{
    public partial class favorite : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "favorite",
                table: "recipes",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "favorites",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    userId = table.Column<int>(nullable: false),
                    recipeId = table.Column<int>(nullable: false),
                    favorite = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_favorites", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "favorites");

            migrationBuilder.DropColumn(
                name: "favorite",
                table: "recipes");
        }
    }
}
