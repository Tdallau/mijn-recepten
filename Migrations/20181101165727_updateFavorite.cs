using Microsoft.EntityFrameworkCore.Migrations;

namespace mijn_recepten.Migrations
{
    public partial class updateFavorite : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "favorite",
                table: "recipes");

            migrationBuilder.DropColumn(
                name: "favorite",
                table: "favorites");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "favorite",
                table: "recipes",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "favorite",
                table: "favorites",
                nullable: false,
                defaultValue: false);
        }
    }
}
