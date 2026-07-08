import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

interface ListContentParams {
    books: Book[]
}

export default function ListContent({books}: ListContentParams) {
    
    return (
        <div className="flex flex-col items-center">
            <div className="text-lg font-medium text-start my-6 w-full">
                <p>Ada {books?.length} Buku yang Tersedia</p>
            </div>
            <div className="flex flex-col w-full gap-y-4">
                {books?.map((data, idx) => (
                    <Card key={idx} className="w-full">
                        <CardContent>
                            <div className="w-full flex justify-between items-center gap-4">
                                <div className="flex flex-row gap-x-4">
                                    <div className="w-20 h-20 rounded-full bg-gray-300 py-8 px-9">
                                        S
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <h1>
                                            {data.title}
                                        </h1>
                                        <p className="text-xl mt-2">
                                            {data.author}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-x-4">
                                    <Button>
                                        Edit Data
                                    </Button>
                                    <Button variant="destructive">
                                        Hapus
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))

                }
            </div>
        </div>
    )
}