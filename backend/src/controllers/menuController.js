const {
    getAllMenuItems,
    getMenuItemById,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem
} = require('../models/menuModel');

// GET /api/menu (public)
function listMenu(req, res) {
    const items = getAllMenuItems();
    res.json(items);
}

// GET /api/menu/:id (public)
function getMenuItem(req, res) {
    const item = getMenuItemById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Menu item not found' });
    res.json(item);
}

// POST /api/menu (admin only)
function addMenuItem(req, res) {
    const { name, description, price, imageUrl } = req.body;
    if (!name || price === undefined) {
        return res.status(400).json({ error: 'Name and price are required' });
    }
    const id = createMenuItem({ name, description, price, imageUrl });
    res.status(201).json({ message: 'Menu item created', id });
}

// PUT /api/menu/:id (admin only)
function editMenuItem(req, res) {
    const { name, description, price, imageUrl, isAvailable } = req.body;
    const existing = getMenuItemById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Menu item not found' });

    updateMenuItem(req.params.id, {
        name: name ?? existing.name,
        description: description ?? existing.description,
        price: price ?? existing.price,
        imageUrl: imageUrl ?? existing.image_url,
        isAvailable: isAvailable ?? existing.is_available
    });
    res.json({ message: 'Menu item updated' });
}

// DELETE /api/menu/:id (admin only)
function removeMenuItem(req, res) {
    const existing = getMenuItemById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Menu item not found' });

    deleteMenuItem(req.params.id);
    res.json({ message: 'Menu item deleted' });
}

module.exports = { listMenu, getMenuItem, addMenuItem, editMenuItem, removeMenuItem };