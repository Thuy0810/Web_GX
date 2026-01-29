# Production Deployment Scripts

Script hỗ trợ build và deploy Docker images cho dự án Web_GX.

## Cài đặt

```bash
# Đảm bảo đã đăng nhập GitLab Registry
docker login registry.gitlab.com
```

## Sử dụng

### Build & Run locally (để test)

```bash
node dev.js dev be-gx     # Build và chạy backend
node dev.js dev fe-gx     # Build và chạy frontend
node dev.js dev all       # Build và chạy cả hai
```

### Build & Push lên Registry

```bash
node dev.js push be-gx    # Build và push backend
node dev.js push fe-gx    # Build và push frontend
node dev.js push all      # Build và push cả hai
```

## Services

| Service | Image | Port | URL |
|---------|-------|------|-----|
| be-gx | `registry.gitlab.com/tuanxx31/taikhoansieure/be-gx` | 1337 | http://localhost:1337/admin |
| fe-gx | `registry.gitlab.com/tuanxx31/taikhoansieure/fe-gx` | 3999 | http://localhost:3999 |

## Cấu trúc file

```
production/
├── dev.js                      # Script build & deploy
├── docker-compose.local.yaml   # Docker compose cho local
├── .env                        # Environment variables
└── README.md                   # File này
```

## Version Format

Version được tạo tự động theo format: `v1.0.YYYYMMDD-HHmm`

Ví dụ: `v1.0.20250129-1430`

## Thêm Service mới

Chỉnh sửa mảng `SERVICES` trong file `dev.js`:

```javascript
const SERVICES = [
  'registry.gitlab.com/tuanxx31/taikhoansieure/be-gx',
  'registry.gitlab.com/tuanxx31/taikhoansieure/fe-gx',
  'registry.gitlab.com/tuanxx31/taikhoansieure/new-service', // Thêm mới
];
```

## Commands hữu ích

```bash
# Xem logs
docker-compose -f docker-compose.local.yaml logs -f be-gx
docker-compose -f docker-compose.local.yaml logs -f fe-gx

# Stop services
docker-compose -f docker-compose.local.yaml down

# Pull image trên server
docker pull registry.gitlab.com/tuanxx31/taikhoansieure/be-gx:v1.0.XXXXXX-XXXX
docker pull registry.gitlab.com/tuanxx31/taikhoansieure/fe-gx:v1.0.XXXXXX-XXXX

# Xem images đã build
docker images registry.gitlab.com/tuanxx31/taikhoansieure
```
