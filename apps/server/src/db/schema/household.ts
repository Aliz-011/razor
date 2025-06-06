import { mysqlSchema, varchar, decimal, index, datetime, date, text } from "drizzle-orm/mysql-core";

export const household = mysqlSchema("household");

export const dynamicMrCbIndihomeTable = (year: string, month: string) => {
    return household.table(`ih_mr_cb_indihome_mm_${year}${month}`, {
        bb_id: varchar('bb_id', { length: 20 }),
        telp_number: varchar('telp_number', { length: 20 }),
        status_migration: varchar('status_migration', { length: 30 }),
        status: decimal('status', { precision: 18, scale: 2 }),
        activation_date: varchar('activation_date', { length: 22 }),
        deactivation_date: varchar('deactivation_date', { length: 22 }),
        activatedDatetime: varchar('activated_datetime', { length: 25 }),
        sto: varchar('sto', { length: 12 }),
        area: varchar('area', { length: 10 }),
        region: varchar('region', { length: 20 }),
        city: varchar('city', { length: 30 }),
        branch: varchar('branch', { length: 30 }),
        cluster: varchar('cluster', { length: 30 }),
        bundle_transaction_id: varchar('bundle_transaction_id', { length: 45 }),
        bid: varchar({ length: 12 }),
        product_commercial_name: varchar('product_commercial_name', { length: 95 }),
        speed: varchar({ length: 100 }),
        flag_inet: varchar('flag_inet', { length: 3 }),
        flag_voice: varchar('flag_voice', { length: 3 }),
        flag_tv: varchar('flag_tv', { length: 3 }),
        flag_pda: varchar('flag_pda', { length: 3 }),
        order_pda: varchar('order_pda', { length: 30 }),
        usage_inet_octet: varchar('usage_inet_octet', { length: 22 }),
        usage_tv_sec: varchar('usage_tv_sec', { length: 22 }),
        usage_voice_sec: varchar('usage_voice_sec', { length: 22 }),
        total_billing: varchar('total_billing', { length: 22 }),
        kw_ih: varchar('kw_ih', { length: 4 }),
        per_ct0: varchar('per_ct0', { length: 12 }),
        ket_ct0: varchar('ket_ct0', { length: 11 }),
        flag_ct0: varchar('flag_ct0', { length: 3 }),
        months_arpu: varchar('3months_arpu', { length: 20 }),
        los: varchar('los', { length: 6 }),
        flag_cb_lm: varchar('flag_cb_lm', { length: 3 }),
        flag_cb_mtd: varchar('flag_cb_mtd', { length: 3 }),
        flag_sales_mtd: varchar('flag_sales_mtd', { length: 3 }),
        flag_churn_mtd: varchar('flag_churn_mtd', { length: 3 }),
        flag_cleansing_mtd: varchar('flag_cleansing_mtd', { length: 3 }),
        citem_inet: varchar('citem_inet', { length: 3 }),
        category_product: varchar('category_product', { length: 100 }),
        eventDate: varchar('event_date', { length: 12 }),
    }, t => [
        index('event_date').on(t.eventDate).using('btree'),
        index('city').on(t.city).using('btree'),
    ])
}

export const dynamicIhOrderingDetailOrderTable = (year: string, month: string) => {
    return household.table(`ih_ordering_detail_order_new_${year}${month}`, {
        stoCo: varchar('sto_co', { length: 50 }),
        kabupaten: varchar('kabupaten', { length: 50 }),
        cluster: varchar('cluster', { length: 50 }),
        branch: varchar('branch', { length: 50 }),
        wok: varchar('wok', { length: 255 }),
        region: varchar('region', { length: 30 }),
        area: varchar('area', { length: 30 }),
        orderId: varchar('order_id', { length: 255 }),
        packageType: varchar('package_type', { length: 255 }),
        productIdCo: varchar('product_id_co', { length: 255 }),
        orderType: varchar('order_type', { length: 255 }),
        orderMode: varchar('order_mode', { length: 255 }),
        orderTs: datetime('order_ts'),
        channelName: varchar('channel_name', { length: 255 }),
        channelGroup: varchar('channel_group', { length: 255 }),
        orderInitiatorId: varchar('order_initiator_id', { length: 255 }),
        orderInitiatorIdType: varchar('order_initiator_id_type', { length: 255 }),
        longitude: varchar('longitude', { length: 255 }),
        latitude: varchar('latitude', { length: 255 }),
        serviceId: varchar('service_id', { length: 255 }),
        productCommercialName: varchar('product_commercial_name', { length: 255 }),
        packageCat: varchar('package_cat', { length: 255 }),
        ioTs: datetime('io_ts'),
        psTs: datetime('ps_ts'),
        proviTs: datetime('provi_ts'),
        completedTs: datetime('completed_ts'),
        name: varchar('name', { length: 255 }),
        address: varchar('address', { length: 255 }),
        noHandphone: varchar('no_handphone', { length: 255 }),
        productType: text('product_type'),
        eventDate: date('event_date'),
    }, t => [
        index('event_date').on(t.eventDate).using('btree')
    ])
}

export const fmcMconTable = household.table('fmc_mcon_final_dd', {
    notel: varchar({ length: 18 }),
    msisdnRecommendation: varchar('msisdn_recommendation', { length: 18 }),
    emailRecommendation: varchar('email_recommendation', { length: 100 }),
    alamatRecommendation: varchar('alamat_recommendation', { length: 255 }),
    latlong: varchar('latlong', { length: 30 }),
    msisdn_indri_verif: varchar('msisdn_indri_verif', { length: 18 }),
    msisdn_indri_not_verif: varchar('msisdn_indri_not_verif', { length: 18 }),
    msisdn_ncx: varchar('msisdn_ncx', { length: 18 }),
    msisdn_dbprofile: varchar('msisdn_dbprofile', { length: 18 }),
    msisdn_nossa_insera: varchar('msisdn_nossa_insera', { length: 18 }),
    msisdn_mytsel: varchar('msisdn_mytsel', { length: 18 }),
    msisdn_myih: varchar('msisdn_myih', { length: 18 }),
    msisdn_kpro: varchar('msisdn_kpro', { length: 18 }),
    msisdn_mydita: varchar('msisdn_mydita', { length: 18 }),
    msisdn_utonline: varchar('msisdn_utonline', { length: 18 }),
    email_indri_verif: varchar('email_indri_verif', { length: 60 }),
    email_indri_not_verif: varchar('email_indri_not_verif', { length: 50 }),
    email_ncx: varchar('email_ncx', { length: 50 }),
    email_dbprofile: varchar('email_dbprofile', { length: 50 }),
    email_nossa_insera: varchar('email_nossa_insera', { length: 50 }),
    email_myih: varchar('email_myih', { length: 50 }),
    email_kpro: varchar('email_kpro', { length: 50 }),
    email_mydita: varchar('email_mydita', { length: 50 }),
    email_utonline: varchar('email_utonline', { length: 50 }),
    alamat: varchar('alamat', { length: 150 }),
    alamat_kpro: varchar('alamat_kpro', { length: 150 }),
    alamat_mydita: varchar('alamat_mydita', { length: 150 }),
    alamat_utonline: varchar('alamat_utonline', { length: 150 }),
    longlitude: varchar('longlitude', { length: 35 }),
    latitude: varchar('latitude', { length: 35 }),
    longlitude_kpro: varchar('longlitude_kpro', { length: 35 }),
    latitude_kpro: varchar('latitude_kpro', { length: 35 }),
    longlitude_mydita: varchar('longlitude_mydita', { length: 35 }),
    latitude_mydita: varchar('latitude_mydita', { length: 35 }),
    longlitude_utonline: varchar('longlitude_utonline', { length: 35 }),
    latitude_utonline: varchar('latitude_utonline', { length: 40 }),
    eventDate: varchar('event_date', { length: 12 }),
}, t => [
    index('event_date').on(t.eventDate).using('btree')
])