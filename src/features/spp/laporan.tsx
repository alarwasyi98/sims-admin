import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { PageHeader } from '@/components/shared/page-header'
import { ConfigDrawer } from '@/components/config-drawer'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { formatRupiah } from '@/lib/format'

// Mock Data Laporan Ringkasan Pos Tagihan
const laporanData = [
    {
        id: '1',
        posBayar: 'SPP MTs - Juli 2026',
        nominalStandar: 750000,
        totalTagihan: 37500000, // 50 siswa
        totalMasuk: 28500000,
    },
    {
        id: '2',
        posBayar: 'Uang Gedung MTs',
        nominalStandar: 3500000,
        totalTagihan: 175000000, // 50 siswa
        totalMasuk: 150000000,
    },
    {
        id: '3',
        posBayar: 'Uang Kegiatan Tahunan',
        nominalStandar: 1750000,
        totalTagihan: 87500000,
        totalMasuk: 45000000,
    },
]

export function LaporanSPP() {
    return (
        <>
            <Header fixed>
                <Search />
                <div className='ms-auto flex items-center space-x-4'>
                    <ThemeSwitch />
                    <ConfigDrawer />
                    <ProfileDropdown />
                </div>
            </Header>

            <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
                <PageHeader
                    title='Laporan SPP'
                    description='Ringkasan penerimaan dana berdasarkan pos tagihan.'
                />

                <Card>
                    <CardHeader>
                        <CardTitle>Ringkasan per Pos Tagihan</CardTitle>
                        <CardDescription>
                            Tabel agregat persentase pembayaran yang sudah masuk dari total tagihan terbit.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='overflow-auto rounded-md border'>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Pos Bayar</TableHead>
                                        <TableHead className='text-right'>Nominal Standar</TableHead>
                                        <TableHead className='text-right'>Total Tagihan (Rp)</TableHead>
                                        <TableHead className='text-right'>Total Masuk (Rp)</TableHead>
                                        <TableHead className='text-right'>% Tertagih</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {laporanData.map((item) => {
                                        const persentase = item.totalTagihan > 0
                                            ? Math.round((item.totalMasuk / item.totalTagihan) * 100)
                                            : 0

                                        return (
                                            <TableRow key={item.id}>
                                                <TableCell className='font-medium'>
                                                    {item.posBayar}
                                                </TableCell>
                                                <TableCell className='text-right font-mono'>
                                                    {formatRupiah(item.nominalStandar)}
                                                </TableCell>
                                                <TableCell className='text-right font-mono text-muted-foreground'>
                                                    {formatRupiah(item.totalTagihan)}
                                                </TableCell>
                                                <TableCell className='text-right font-mono text-emerald-600 dark:text-emerald-400'>
                                                    {formatRupiah(item.totalMasuk)}
                                                </TableCell>
                                                <TableCell className='text-right'>
                                                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${persentase >= 80 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
                                                        : persentase >= 50 ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                                                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                                        }`}>
                                                        {persentase}%
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </Main>
        </>
    )
}
