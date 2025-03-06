import nibabel as nib

# 파일 경로
file_path = r"C:\Users\user\Desktop\sjm\data\kits_00000.nii.gz"

# NIfTI 파일 로드
nii_img = nib.load(file_path)

# NumPy 배열로 변환
data = nii_img.get_fdata()

# 1 이상의 값을 1로 변환
data[data >= 1] = 1

# 데이터 타입 유지 (기존 데이터 타입과 맞춤)
data = data.astype(nii_img.get_data_dtype())

# 변환된 데이터로 새로운 NIfTI 이미지 생성
new_nii = nib.Nifti1Image(data, affine=nii_img.affine, header=nii_img.header)

# 저장할 파일 경로
output_path = r"C:\Users\user\Desktop\sjm\data\kits_00000_testtest.nii.gz"

# 새로운 NIfTI 파일 저장
nib.save(new_nii, output_path)

print(f"Processed NIfTI file saved to: {output_path}")
