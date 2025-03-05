using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace chatApp.EF.Migrations
{
    /// <inheritdoc />
    public partial class addViewToMessage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "View",
                table: "Messages",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "View",
                table: "Messages");
        }
    }
}
