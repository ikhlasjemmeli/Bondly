﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using chatApp.EF;

#nullable disable

namespace chatApp.EF.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    [Migration("20250126173345_AddReaction")]
    partial class AddReaction
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.20")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("chatApp.CORE.Models.Post", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("postPath")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("privacy")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("publicationDate")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Posts");
                });

            modelBuilder.Entity("chatApp.CORE.Models.Profile", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Bio")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CovoerPicture")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProfilePicture")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Situation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Study")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("WorkPlace")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Profiles");
                });

            modelBuilder.Entity("chatApp.CORE.Models.Reaction", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Number")
                        .HasColumnType("int");

                    b.Property<int>("ReactionTypeId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ReactionTypeId");

                    b.ToTable("Reactions");
                });

            modelBuilder.Entity("chatApp.CORE.Models.ReactionType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("ReactionType");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Type = "like"
                        },
                        new
                        {
                            Id = 5,
                            Type = "love"
                        },
                        new
                        {
                            Id = 4,
                            Type = "haha"
                        },
                        new
                        {
                            Id = 2,
                            Type = "clap"
                        },
                        new
                        {
                            Id = 3,
                            Type = "smile"
                        });
                });

            modelBuilder.Entity("chatApp.CORE.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("chatApp.CORE.Models.Post", b =>
                {
                    b.HasOne("chatApp.CORE.Models.User", null)
                        .WithMany("Posts")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("chatApp.CORE.Models.Profile", b =>
                {
                    b.HasOne("chatApp.CORE.Models.User", null)
                        .WithOne("Profile")
                        .HasForeignKey("chatApp.CORE.Models.Profile", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("chatApp.CORE.Models.Reaction", b =>
                {
                    b.HasOne("chatApp.CORE.Models.ReactionType", "ReactionType")
                        .WithMany()
                        .HasForeignKey("ReactionTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ReactionType");
                });

            modelBuilder.Entity("chatApp.CORE.Models.User", b =>
                {
                    b.Navigation("Posts");

                    b.Navigation("Profile")
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
