// import Link from 'next/link';
// import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Box, Button, Grid, GridCol, Group, Image } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
//so image can work with imports and still use mantine styling:
import NextImage from "next/image";
// header that i reuse and the icons that it uses';
import { HeaderSimple } from "@/components/HeaderSimpleHome";
//to use local images in nextjs
import myPhoto from "../public/nyseer.png";

export default function HomePage() {
	return (
		<>
			<div id="home-section" />
			<HeaderSimple />

			<Box px={{ base: "sm", md: "xl" }}>
				{/* grouped by rows */}
				<Grid>
					<GridCol span={{ base: 1, md: 5, lg: 5 }} />
					<GridCol span={{ base: 12, md: 2, lg: 2 }}>
						{/* <Image
							component={NextImage}
							radius="lg"
							h={200}
							w="auto"
							fit="contain"
							src={myPhoto}
							alt="My image"
						/> */}

						<br />
						<br />
						<br />
					</GridCol>
					<GridCol span={{ base: 1, md: 5, lg: 5 }} />

					<GridCol span={{ base: 12, md: 12, lg: 12 }}>
						<h4>
							<i>Hey, i'm Nyseer Couse</i>
						</h4>
						<h1>Full-Stack Software Developer</h1>
					</GridCol>

					<GridCol span={{ base: 12, md: 4, lg: 4 }} />
					<GridCol span={{ base: 12, md: 4, lg: 4 }}>
						<h4>Here you can check out the projects I've worked on. Oh Wow!</h4>
					</GridCol>
					<GridCol span={{ base: 12, md: 4, lg: 4 }} />

					<GridCol span={{ base: 12, md: 4, lg: 4 }} />
					<GridCol span={{ base: 10, md: 4, lg: 4 }}>
						<Group justify="center">
							{/* <Button size="lg" component="a" href="#contact-section" color='lightseagreen'>
                Say Hello
              </Button> */}
							<Button
								size="lg"
								component="a"
								href="#project-section"
								color="dark"
							>
								Projects
								<IconExternalLink style={{ paddingLeft: "2px" }} />
							</Button>
						</Group>
					</GridCol>
					<GridCol span={{ base: 12, md: 4, lg: 4 }} />
				</Grid>
				<br />
				<br />
				<br />

				{/* Content of the section */}
				<div id="project-section">
					<Grid>
						<GridCol span={{ base: 10, md: 3, lg: 3 }} />

						<GridCol span={{ base: 10, md: 6, lg: 6 }}>
							<h1>Featured Projects</h1>
						</GridCol>

						<GridCol span={{ base: 10, md: 3, lg: 3 }} />
						<GridCol span={{ base: 10, md: 3, lg: 3 }} />

						<GridCol span={{ base: 12, md: 4, lg: 4 }}>
							<h2>Online Retailer Database Design</h2>
							<br />
							<br />
							<br />
							<p>
								Database Design for E-commerce online retail website. Lorem
								ipsum dolor sit amet consectetur adipiscing elit. Quisque
								faucibus ex sapien vitae pellentesque sem placerat. In id cursus
								mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
								urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
								egestas. Iaculis massa nisl malesuada lacinia integer nunc
								posuere. Ut hendrerit semper vel class aptent taciti sociosqu.
								Ad litora torquent per conubia nostra inceptos himenaeos.
							</p>
						</GridCol>
						<GridCol span={{ base: 12, md: 3, lg: 3 }}>
							<h1>picture here</h1>
							<br />
							<br />
							<br />
							<Group>
								<Button
									size="md"
									component="a"
									href="/online-retail-database"
									color="lightseagreen"
								>
									Database
								</Button>
								<Button size="md" component="a" href="/projects" color="dark">
									Github
									<IconExternalLink style={{ paddingLeft: "2px" }} />
								</Button>
								<Button
									size="md"
									component="a"
									href="#home-section"
									variant="default"
								>
									Back To Top
								</Button>
							</Group>
						</GridCol>
						{/* button group */}
					</Grid>
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
				</div>
				{/* Content of the section */}
				<div id="contact-section">
					<br />
					<Grid>
						<GridCol span={{ base: 10, md: 3, lg: 3 }} />

						<GridCol span={{ base: 10, md: 6, lg: 6 }}>
							<h1>Contact</h1>
						</GridCol>

						<GridCol span={{ base: 10, md: 3, lg: 3 }} />
						<GridCol span={{ base: 10, md: 3, lg: 3 }} />

						<GridCol span={{ base: 12, md: 4, lg: 4 }}>
							<h3>Reach out to me here!</h3>
							<Group>
								<Button
									size="xl"
									component="a"
									href="mailto:nyseer.couse@gmail.com"
									color="dark"
								>
									nyseer.couse@gmail.com
								</Button>
								<Button
									size="xl"
									component="a"
									href="tel:347-597-9610"
									color="lightseagreen"
								>
									347-579-9610
								</Button>
							</Group>
							<br />
							<br />
							<br />
							<p>
								hire me hire me hire me hire me hire me hire me hire me hire me
								hire me hire me hire me hire me hire me hire me hire me hire me
								hire me hire me hire me hire me hire me hire me hire me hire me
								hire me hire me hire me hire me hire me hire me hire me hire me
								hire me hire me hire me hire me hire me hire me hire me hire me
								hire me hire me hire me hire me{" "}
							</p>
						</GridCol>
						<GridCol span={{ base: 12, md: 3, lg: 3 }}>
							<h1>picture here</h1>
							<br />
							<br />
							<br />
							<Group>
								<Button
									size="md"
									component="a"
									href="/contact"
									color="lightseagreen"
								>
									Linkedin
								</Button>
								<Button size="md" component="a" href="/projects" color="dark">
									Github
									<IconExternalLink style={{ paddingLeft: "2px" }} />
								</Button>
								<Button
									size="md"
									component="a"
									href="#home-section"
									variant="default"
								>
									Back To Top
								</Button>
							</Group>
						</GridCol>
						{/* button group */}
					</Grid>
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
				</div>
			</Box>
		</>
	);
}
