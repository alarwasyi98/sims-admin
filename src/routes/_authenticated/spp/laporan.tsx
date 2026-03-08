import { createFileRoute } from '@tanstack/react-router'
import { LaporanSPP } from '@/features/spp/laporan'

export const Route = createFileRoute('/_authenticated/spp/laporan')({
    component: LaporanSPP,
})
