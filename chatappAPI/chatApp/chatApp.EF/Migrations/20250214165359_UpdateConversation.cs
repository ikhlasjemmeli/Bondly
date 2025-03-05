using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace chatApp.EF.Migrations
{
    /// <inheritdoc />
    public partial class UpdateConversation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "Conversations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "blue");

            migrationBuilder.AddColumn<string>(
                name: "Emoji",
                table: "Conversations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "thumb_up");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Color",
                table: "Conversations");

            migrationBuilder.DropColumn(
                name: "Emoji",
                table: "Conversations");
        }
    }
}
