import { db } from "@/db";
import paths from "@/paths";
import { Chip } from "@nextui-org/react";
import Link from "next/link";

export default async function TopicList() {
    const topics = await db.topic.findMany();

    const content = topics.map((topic) => {
        return (
            <div key={topic.id}>
                <Link href={paths.topicShow(topic.slug)}>
                    <Chip color="warning">{topic.slug}</Chip>
                </Link>
            </div>
        );
    });
    return <div className="flex flex-row flex-wrap gap-2">{content}</div>;
}
