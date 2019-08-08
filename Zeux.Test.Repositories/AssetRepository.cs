using System.Linq;
using System.Threading.Tasks;
using Zeux.Test.Models;

namespace Zeux.Test.Repositories
{
    public class AssetRepository: IAssetRepository
    {
        private readonly FakeContext _context = new FakeContext();

        private IQueryable<Asset> OrderedAssets => _context.Assets.OrderBy(x => x.Name);

        public async Task<IQueryable<Asset>> Get()
        {
            return await Task.Run(() => OrderedAssets);
        }

        public async Task<IQueryable<Asset>> Get(string type)
        {
            return await Task.Run(() => OrderedAssets.Where(row => row.Type.Name.ToLower() == type.ToLower()));
        }

        public async Task<IQueryable<AssetType>> GetTypes()
        {
            return await Task.Run(() => _context.AssetTypes);
        }
    }
}
