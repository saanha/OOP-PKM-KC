import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Merchant_Config')
export class MerchantConfig extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id_merchant_config' })
    merchantConfigId!: number;

    @Column({ length: 64, name: 'primary_color', nullable: true })
    primaryColor!: string;

    @Column({ length: 64, name: 'secondary_color', nullable: true })
    secondaryColor!: string;

    @Column({ length: 64, name: 'third_color', nullable: true })
    thirdColor!: string;

    @Column({ length: 64, name: 'logo_photo_path', nullable: true })
    logoPhotoPath!: string;

    @Column({ length: 64, name: 'home_photo_path', nullable: true })
    homePhotoPath!: string;

    @Column({ length: 64, name: 'about_photo_path', nullable: true })
    aboutPhotoPath!: string;

    @Column({ length: 64, name: 'about_description', nullable: true })
    aboutDescription!: string;
}
